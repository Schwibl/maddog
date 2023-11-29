import logo from './panel-logo2x.webp';
import styles from './App.module.scss';

function App() {
  return (
    <div className='App'>
      <section className={styles.login}>
        <div className={styles.container}>
            <a href='/' className={styles.imgSide}>
                <img src={logo} className={styles.img} />
            </a>
            <div className={styles.formSide}>
                <form className={styles.form} action='/login' method='post'>
                    <h1 className={styles.enter}>ВХОД В СИСТЕМУ</h1>
                    <div className={styles.input}>
                        <div className={stylrs.inputWrap}>
                            <label className={styles.label}>Логин*</label>
                            <input className={styles.input} type='text' name='username' placeholder='Можете ввести свой логин, телефон или почту...' autocomplete='on' required />
                        </div>
                        <div className={styles.inputWrap}></div>
                            <label className={styles.label}>Пароль*</label>
                            <input className={styles.input} type='password' name='password' placeholder='Введите свой пароль...' autocomplete='on' required />
                    </div>
                        <input className={styles.submit} name='submit' type='submit' value='ВХОД' />
                </form>
            </div>
        </div>
      </section>
    </div>
  );
}

export default App;
