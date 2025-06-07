from flask_wtf import FlaskForm
from wtforms import (StringField, PasswordField, SubmitField, BooleanField, 
                    SelectField, TextAreaField, HiddenField)
from wtforms.validators import DataRequired, Email, EqualTo, Length, Optional
from wtforms import ValidationError
from app.models.user import User


class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Пароль', validators=[DataRequired()])
    remember_me = BooleanField('Запомнить меня')
    submit = SubmitField('Войти')


class BaseRegistrationForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Пароль', validators=[
        DataRequired(),
        Length(min=8, message='Пароль должен содержать минимум 8 символов')
    ])
    password2 = PasswordField(
        'Повторите пароль', 
        validators=[DataRequired(), EqualTo('password')]
    )
    role = HiddenField('Роль')  # Будет устанавливаться автоматически


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
        if not super().validate(extra_validators):
            return False
            
        if self.field.data == 'Другое' and not self.other_field.data:
            self.other_field.errors.append('Пожалуйста, укажите вашу сферу деятельности')
            return False
            
        return True


class EmployerRegistrationForm(BaseRegistrationForm):
    company_name = StringField('Название компании', validators=[DataRequired()])
    contact_person = StringField('Контактное лицо', validators=[DataRequired()])
    industry = StringField('Отрасль', validators=[DataRequired()])
    submit = SubmitField('Зарегистрироваться как работодатель')


class ForgotPasswordForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    submit = SubmitField('Отправить инструкции')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if not user:
            raise ValidationError('Аккаунт с таким email не найден')


class ResetPasswordForm(FlaskForm):
    password = PasswordField('Новый пароль', validators=[
        DataRequired(),
        Length(min=8, message='Пароль должен содержать минимум 8 символов')
    ])
    password2 = PasswordField(
        'Повторите пароль', 
        validators=[DataRequired(), EqualTo('password')]
    )
    submit = SubmitField('Изменить пароль')


# Общая форма для выбора типа регистрации
class RegistrationTypeForm(FlaskForm):
    role = SelectField('Тип аккаунта', choices=[
        ('candidate', 'Я кандидат'),
        ('employer', 'Я работодатель')
    ], validators=[DataRequired()])
    submit = SubmitField('Продолжить')


class RegistrationForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Пароль', validators=[
        DataRequired(),
        Length(min=8, message='Пароль должен содержать минимум 8 символов')
    ])
    password2 = PasswordField(
        'Повторите пароль',
        validators=[DataRequired(), EqualTo('password')]
    )
    role = SelectField('Роль', choices=[
        ('candidate', 'Кандидат'),
        ('employer', 'Работодатель')
    ], validators=[DataRequired()])
    submit = SubmitField('Зарегистрироваться')

    def validate_email(self, email):
        user = User.query.filter_by(email=email.data).first()
        if user is not None:
            raise ValidationError('Этот email уже зарегистрирован')

class QuickContactForm(FlaskForm):
    name = StringField('Имя', validators=[DataRequired()])
    contact = StringField('Email или Telegram', validators=[DataRequired()])
    message = TextAreaField('Сообщение', validators=[DataRequired()])
    submit = SubmitField('Отправить')