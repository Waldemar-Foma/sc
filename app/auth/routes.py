from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask_login import login_user, logout_user, current_user, login_required
from werkzeug.security import generate_password_hash, check_password_hash
from app.forms import LoginForm, RegistrationForm
from app.models.user import User
from app.extensions import db
from app.forms import CandidateRegistrationForm


auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    
    form = LoginForm()
    if form.validate_on_submit():
        user = User.query.filter_by(username=form.username.data).first()
        if user and user.check_password(form.password.data):
            login_user(user, remember=form.remember_me.data)
            next_page = request.args.get('next')
            return redirect(next_page or url_for('main.index'))
        flash('Неверное имя пользователя или пароль', 'danger')
    return render_template('main/glux.html', form=form)

@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        return redirect(url_for('main.glux'))
    
    form = RegistrationForm()
    if form.validate_on_submit():
        user = User(
            username=form.username.data,
            email=form.email.data,
            password_hash=generate_password_hash(form.password.data)
        )
        db.session.add(user)
        db.session.commit()
        flash('Регистрация успешна! Теперь вы можете войти.', 'success')
        return redirect(url_for('auth.login'))
    return render_template('main/glux.html', form=form)

@auth_bp.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))

@auth_bp.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    if current_user.is_authenticated:
        return redirect(url_for('main.plan'))
    

@auth_bp.route('/register/candidate', methods=['GET', 'POST'])
def register_candidate():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    
    form = CandidateRegistrationForm()
    
    if form.validate_on_submit():
        # Определяем окончательную сферу деятельности
        final_field = form.other_field.data if form.field.data == 'Другое' else form.field.data
        
        user = User(
            username=form.username.data,
            email=form.email.data,
            role='candidate',
            fullname=form.fullname.data,
            field=final_field,  # Используем выбранное или введенное значение
            experience=form.experience.data,
            skills=form.skills.data
        )
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Регистрация кандидата успешно завершена!', 'success')
        return redirect(url_for('auth.login'))
    
    return render_template('auth/register_candidate.html', form=form)

@auth_bp.route('/register/employer', methods=['GET', 'POST'])
def register_employer():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    
    form = RegistrationForm(role='employer')
    if form.validate_on_submit():
        user = User(
            username=form.username.data,
            email=form.email.data,
            role='employer'
        )
        user.set_password(form.password.data)
        db.session.add(user)
        db.session.commit()
        flash('Регистрация работодателя успешно завершена!', 'success')
        return redirect(url_for('auth.login'))
    
    return render_template('auth/register_employer.html', form=form)