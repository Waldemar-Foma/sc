from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, BooleanField, SubmitField
from wtforms.validators import DataRequired, Email, EqualTo, Length, Optional
from wtforms import StringField, TextAreaField, SelectField, validators, BaseRegistrationForm
from wtforms import ValidationError
from app.models.user import User


class LoginForm(FlaskForm):
    username = StringField('Имя пользователя', validators=[DataRequired()])
    password = PasswordField('Пароль', validators=[DataRequired()])
    remember_me = BooleanField('Запомнить меня')
    submit = SubmitField('Войти')

class RegistrationForm(FlaskForm):
    username = StringField('Имя пользователя', validators=[
        DataRequired(),
        Length(min=4, max=25)
    ])
    email = StringField('Email', validators=[
        DataRequired(),
        Email()
    ])
    password = PasswordField('Пароль', validators=[
        DataRequired(),
        Length(min=6)
    ])
    confirm_password = PasswordField('Подтвердите пароль', validators=[
        DataRequired(),
        EqualTo('password', message='Пароли должны совпадать')
    ])
    submit = SubmitField('Зарегистрироваться')

    def validate_username(self, field):
        if User.query.filter_by(username=field.data).first():
            raise ValidationError('Это имя пользователя уже занято')

    def validate_email(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('Этот email уже используется')
        
class RegistrationForm(FlaskForm):
    username = StringField('Имя пользователя', validators=[
        DataRequired(),
        Length(min=4, max=25)
    ])
    email = StringField('Email', validators=[
        DataRequired(),
        Email()
    ])
    password = PasswordField('Пароль', validators=[
        DataRequired(),
        Length(min=6)
    ])
    confirm_password = PasswordField('Подтвердите пароль', validators=[
        DataRequired(),
        EqualTo('password', message='Пароли должны совпадать')
    ])
    submit = SubmitField('Зарегистрироваться')

    def validate_username(self, field):
        if User.query.filter_by(username=field.data).first():
            raise ValidationError('Это имя пользователя уже занято')

    def validate_email(self, field):
        if User.query.filter_by(email=field.data).first():
            raise ValidationError('Этот email уже используется')
        

class CandidateRegistrationForm(BaseRegistrationForm):
    fullname = StringField('ФИО', validators=[DataRequired()])
    field = SelectField('Сфера деятельности', choices=[
        ('IT', 'IT'),
        ('Маркетинг', 'Маркетинг'),
        ('Менеджмент', 'Менеджмент'),
        ('Дизайн', 'Дизайн'),
        ('Другое', 'Другое')
    ])
    other_field = StringField('Укажите вашу сферу', validators=[
        Optional(),
        Length(max=100)
    ])
    experience = TextAreaField('Опыт работы', validators=[Optional()])
    skills = StringField('Ключевые навыки', validators=[Optional()])
    submit = SubmitField('Зарегистрироваться как кандидат')
    def validate(self, extra_validators=None):
        # Стандартная валидация
        if not super().validate(extra_validators):
            return False
        
        # Дополнительная проверка для "Другой" сферы
        if self.field.data == 'Другое' and not self.other_field.data:
            self.other_field.errors.append('Пожалуйста, укажите вашу сферу деятельности')
            return False
            
        return True