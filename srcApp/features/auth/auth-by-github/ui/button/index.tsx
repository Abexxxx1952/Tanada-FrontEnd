import { Button } from "@/srcApp/shared/ui/button";

type LoginWithGithubButtonProps = {
  onClickHandler: () => void;
};

export function LoginWithGithubButton({
  onClickHandler,
}: LoginWithGithubButtonProps) {
  return (
    <Button
      onClick={onClickHandler}
      text="Login with Github"
      backgroundColor="transparent"
      icon="/icons/github.svg"
    />
  );
}
