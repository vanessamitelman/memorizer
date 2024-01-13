import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { checkUserAuthentication } from '../utils/checkUserAuthentication';
import { UserInfoAtom } from '../states/userState';
import { useSetAtom } from 'jotai';
import styles from '../styles/Home.module.css';
import { DialogComponent } from '../components/dialog';

export function Home() {
  const [openDialog, setOpenDialog] = useState(false);
  const set_user_info = useSetAtom(UserInfoAtom);
  const { login, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  useEffect(() => {
    checkUserAuthentication({ set_user_info, login, logout, navigate });
    //if (isAuthenticated) setOpenDialog(true);
  }, [isAuthenticated]);
  return (
    <main className={styles.container}>
      <div className={`${styles.wrapperDark} ${styles.wrapperNarrow}`}>
        <div className={styles.topNav}>
          <div className={styles.logoName}>MemoryMe</div>
          <div className={styles.btnContainer}>
            <button
              className={`${styles.btn} ${styles.signUpBtn}`}
              onClick={() => navigate('/sign-up')}
            >
              Sign up
            </button>
            <button
              className={`${styles.btn} ${styles.loginBtn}`}
              onClick={() => navigate('/login')}
            >
              Login
            </button>
          </div>
        </div>
      </div>
      <div className={styles.wrapperDark}>
        <div className={styles.textContainer}>
          <h2>A Better Way to Memorize Things</h2>
          <p>
            Memozora is an online flashcard maker powered by spaced repetition
            method. It works great for language learning, test preparation, and
            more.
          </p>
          <button
            className={`${styles.btn} ${styles.startNowBtn}`}
            onClick={() => navigate('/sign-up')}
          >
            Start Using Now (for free)
          </button>
        </div>
      </div>
      <div className={styles.wrapperLight}>
        <div className={styles.textContainer}>
          <h2>Why it's effective?</h2>
          <p>
            This flashcard maker uses "Spaced Repetition" method to help you
            learn effectively. With Spaced Repetition, you will learn difficult
            cards more often and easy cards less. This will save your overall
            study time.
          </p>
        </div>
      </div>
      <div className={styles.wrapperLight}>
        <div className={styles.textContainer}>
          <h2>How it works?</h2>
          <p>
            This flashcard maker uses "Spaced Repetition" method to help you
            learn effectively. With Spaced Repetition, you will learn difficult
            cards more often and easy cards less. This will save your overall
            study time.
          </p>
        </div>
      </div>
      {isAuthenticated && (
        <DialogComponent
          open={openDialog}
          handleClose={handleCloseDialog}
          title='You are Already Signed in'
          text='Click The Yes button to redirect to the dashboard ot click cancel to close this window'
          btnLeftAction={handleCloseDialog}
          btnLeftText='Cancel'
          btnRightAction={() => navigate('/dashboard')}
          btnRightText='Yes'
        />
      )}
    </main>
  );
}

export default Home;
