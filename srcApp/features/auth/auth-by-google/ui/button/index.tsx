import { Button } from "@/srcApp/shared/ui/button";

type LoginWithGoogleButtonProps = {
  onClickHandler: () => void;
};

export function LoginWithGoogleButton({
  onClickHandler,
}: LoginWithGoogleButtonProps) {
  return (
    <Button
      onClick={onClickHandler}
      text="Login with Google"
      backgroundColor="transparent"
      icon="/icons/google.svg"
    />
  );
}
