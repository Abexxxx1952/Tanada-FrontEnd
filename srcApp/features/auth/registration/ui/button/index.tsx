import { Button } from "@/srcApp/shared/ui/button";

type RegistrationButtonProps = {
  onClickHandler: () => void;
};

export function RegistrationButton({
  onClickHandler,
}: RegistrationButtonProps) {
  return (
    <Button
      onClick={onClickHandler}
      text="Registration"
      textColor="white"
      backgroundColor="var(--logoColor)"
      focusBackgroundColor="var(--logoColor)"
    />
  );
}
