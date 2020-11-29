from django.db import models

from .common import LoginResult, ViewerClient, AccessType


class Session(models.Model):
    id = models.BigAutoField(primary_key=True)
    start_time = models.DateTimeField(blank=True, null=True, default=None)
    finish_time = models.DateTimeField(blank=True, null=True, default=None)
    timeout = models.IntegerField()
    user = models.CharField(max_length=255, blank=True, null=True)
    login_result = models.SmallIntegerField(
        choices=[
            (LoginResult.UN_TRIED, 'untri'),
            (LoginResult.LOGIN_SUCCESS, 'viewer'),
            (LoginResult.LOGIN_FAIL, 'client')
        ],
        default=0
    )
    failure_reason = models.IntegerField()
    view_client = models.SmallIntegerField(
        choices=[
            (ViewerClient.UNKNOWN, 'unkown'),
            (ViewerClient.VIEWER, 'viewer'),
            (ViewerClient.CLIENT, 'client')
        ],
        default=ViewerClient.UNKNOWN
    )
    login_type = models.BigIntegerField(blank=True, null=True, default=None)
    local_address = models.CharField(max_length=39, blank=True, null=True, default=None)
    remote_address = models.CharField(max_length=39, blank=True, null=True, default=None)
    local_host = models.CharField(max_length=255, blank=True, null=True, default=None)

    class Meta:
        managed = True
        db_table = 'session'
        verbose_name_plural = 'session'
        pass

    pass


class SessionMacAddress(models.Model):
    id = models.BigAutoField(primary_key=True)
    session = models.ForeignKey(Session, to_field='id', on_delete=models.CASCADE, db_column='session')
    value = models.CharField(max_length=17)

    class Meta:
        managed = True
        db_table = 'session_mac_address'
        verbose_name_plural = 'session_mac_address'
        constraints = [
            models.UniqueConstraint(fields=['session', 'value'], name='session_session_mac_address_value_unq')
        ]
        pass
    pass


class P2PSession(models.Model):
    id = models.BigAutoField(primary_key=True)
    src_session = models.ForeignKey(Session, to_field='id', on_delete=models.CASCADE,
                                    db_column='src_session', related_name='+')
    dest_session = models.ForeignKey(Session, to_field='id', on_delete=models.CASCADE,
                                    db_column='dest_session', related_name='+')
    src_port = models.PositiveIntegerField()
    dest_port = models.PositiveIntegerField()
    start_time = models.DateTimeField()
    finish_time = models.DateTimeField()

    class Meta:
        managed = True
        db_table = 'p2p_session'
        verbose_name_plural = 'p2p_session'
        pass
    pass


class User(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    name = models.CharField(max_length=64, unique=False)
    registred_time = models.DateField()
    password = models.CharField(max_length=20, blank=True, null=True, default=None)
    type = models.SmallIntegerField(
        choices=[
            (AccessType.SYSTEM_ADMIN, 'SystemAdmin'),
            (AccessType.ACCOUNT_OWNER, 'AccountOwner'),
            (AccessType.GENERIC_USER, 'user')
        ],
        default=ViewerClient.UNKNOWN
    )

    class Meta:
        managed = True
        db_table = 'user'
        verbose_name_plural = 'user'
        pass
    pass


class AccountGroup(models.Model):
    owner = models.OneToOneField(User, to_field='id', on_delete=models.PROTECT,
                                    db_column='owner', primary_key=True, unique=True)
    edit_password = models.IntegerField()

    class Meta:
        managed = True
        db_table = 'account_group'
        verbose_name_plural = 'account_group'
        pass
    pass


class AccountGroupMember(models.Model):
    id = models.AutoField(primary_key=True, unique=True)
    owner = models.ForeignKey(AccountGroup, to_field='owner', on_delete=models.CASCADE)
    member = models.ForeignKey(User, to_field='id', on_delete=models.CASCADE, db_column='member')

    class Meta:
        managed = True
        db_table = 'account_group_member'
        verbose_name_plural = 'account_group_member'
        constraints = [
            models.UniqueConstraint(fields=['owner', 'member'], name='account_group_member_owner_member_unq'),
            models.UniqueConstraint(fields=['member'], name='account_group_member_member_unq')
        ]
        pass
    pass