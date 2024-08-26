"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useImperativeDisableScroll } from "@/srcApp/shared/hooks/useImperativeDisableScroll";
import { Button } from "@/srcApp/shared/ui/button";
import { Input } from "@/srcApp/shared/ui/input";
import { registerUser } from "@/srcApp/features/auth/registration/model/register-user";
import { RegistrationButton } from "@/srcApp/features/auth/registration/ui/button";
import { toast } from "react-toastify";
import styles from "./styles.module.css";
import { LoginWithGoogleButton } from "@/srcApp/features/auth/auth-by-google/ui/button";
import { LoginWithGithubButton } from "@/srcApp/features/auth/auth-by-github/ui/button";
import { UserFromServer } from "@/srcApp/entities/user/model/types";
import { ErrorData } from "@/srcApp/features/user/model/types";
import { isUserFromServer } from "@/srcApp/features/user/lib/isUserFromServer";
import { isErrorData } from "@/srcApp/features/user/lib/isErrorData";
import { LoginButton } from "@/srcApp/features/auth/login/ui/button";
import { loginUser } from "@/srcApp/features/auth/login/model/login-user";


type LoginModalProps = {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: React.Dispatch<React.SetStateAction<UserFromServer | null>>;
};
export function LoginModal({ setModalOpen, setUser }: LoginModalProps) {
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const router = useRouter();

  const body = document.querySelector("body");
  useImperativeDisableScroll(body, true);

  const googleLoginUrl: string = process.env.NEXT_PUBLIC_LOGIN_GOOGLE || "";
  const githubLoginUrl: string = process.env.NEXT_PUBLIC_LOGIN_GITHUB || "";

  function handleInput(e: React.ChangeEvent<HTMLInputElement>) {
    if (e.currentTarget.type === "email") {
      setEmail(e.currentTarget.value);
    }
    if (e.currentTarget.type === "password") {
      setPassword(e.currentTarget.value);
    }
  }

  function handleLoginWithGoogle() {
    router.push(googleLoginUrl);
  }

  function handleLoginWithGithub() {
    router.push(githubLoginUrl);
  }

  async function handleLoginUser() {
    try {
      const userOrError: UserFromServer | undefined | ErrorData =
        await loginUser(email, password);
      if (isUserFromServer(userOrError)) {
        setUser(userOrError);
        toast.success(`Successfully logged ${userOrError.email}`, {
          position: "top-right",
        });
        setModalOpen(false);
      }
      if (isErrorData(userOrError)) {
        toast.error(
          `Error: ${userOrError.status} ${
            userOrError.statusText
          }. Massage: ${JSON.stringify(userOrError)}`,
          {
            position: "top-right",
          }
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred.", {
        position: "top-right",
      });
    }
  }

  async function handleRegisterUser() {
    try {
      const userOrError: UserFromServer | undefined | ErrorData =
        await registerUser(email, password);
      if (isUserFromServer(userOrError)) {
        toast.success(`Successfully logged ${userOrError.email}`, {
          position: "top-right",
        });
        setCreateModal(false);
      }
      if (isErrorData(userOrError)) {
        toast.error(
          `Error: ${userOrError.status} ${
            userOrError.statusText
          }. Massage: ${JSON.stringify(userOrError)}`,
          {
            position: "top-right",
          }
        );
      }
    } catch (error) {
      toast.error("An unexpected error occurred.", {
        position: "top-right",
      });
    }
  }

  return (
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={() => setModalOpen(false)}></div>

      <div className={styles.content}>
        <div className={styles.content__rectangle}>
          <div className={styles.content__frame}>
            <Image
              src="/images/loginPageFrame.png"
              fill={true}
              alt="loginPageFrame"
              sizes="(max-width: 412px) 70vw, (max-width: 816px) 80vw, (max-width: 1200px) 90vw, 100vw"
              placeholder="blur"
              blurDataURL="/images/loginPageFrame_blur.png"
            />
          </div>
          <span className={styles.content__tagline}>
            Turn your ideas into reality.
          </span>
        </div>

        <div className={styles.loginContainer}>
          <img
            className={styles.crossLogo}
            src="/icons/cross.svg"
            alt="Cross icon"
          />
          {!createModal && (
            <div className={styles.loginBox}>
              <h2 className={styles.loginBox__title}>Login to your Account</h2>
              <div className={styles.loginBox__googleButton}>
                <LoginWithGoogleButton onClickHandler={handleLoginWithGoogle} />
              </div>
              <div className={styles.loginBox__githubButton}>
                <LoginWithGithubButton onClickHandler={handleLoginWithGithub} />
              </div>

              <span className={styles.loginBox__divider}>
                ------------- or Sign in with Email -------------
              </span>
              <div className={styles.loginBox__emailInput}>
                <Input
                  text="Email"
                  placeholder="email@gmail.com"
                  type="email"
                  onChange={handleInput}
                  value={email}
                />
              </div>
              <div className={styles.loginBox__passwordInput}>
                <Input
                  text="Password"
                  placeholder="**********"
                  type="password"
                  onChange={handleInput}
                  value={password}
                />
              </div>
              <div className={styles.loginBox__loginButton}>
                <LoginButton onClickHandler={handleLoginUser} />
              </div>
              <div className={styles.loginBox__registerContainer}>
                <span className={styles.loginBox__registerText}>
                  Not Registered Yet?
                </span>
                <span
                  className={styles.loginBox__registerLink}
                  onClick={() => setCreateModal(true)}
                >
                  Create an account
                </span>
              </div>
            </div>
          )}
          {createModal && (
            <div className={styles.loginBox}>
              <h2 className={styles.loginBox__title}>Registration</h2>

              <div className={styles.loginBox__emailInput}>
                <Input
                  text="Email"
                  placeholder="email@gmail.com"
                  type="email"
                  onChange={handleInput}
                  value={email}
                />
              </div>
              <div className={styles.loginBox__passwordInput}>
                <Input
                  text="Password"
                  placeholder="**********"
                  type="password"
                  onChange={handleInput}
                  value={password}
                />
              </div>
              <div className={styles.loginBox__loginButton}>
                <RegistrationButton onClickHandler={handleRegisterUser} />
              </div>
              <div className={styles.loginBox__backButton}>
                <Button
                  onClick={() => setCreateModal(false)}
                  text="Back"
                  textColor="white"
                  backgroundColor="var(--logoColor)"
                  focusBackgroundColor="var(--logoColor)"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
