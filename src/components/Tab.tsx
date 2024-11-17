import clsx from "classnames";

interface TabProps {
  active?: boolean;
  onClick?: () => void;
  title: string;
}

const Tab = ({ title, active, onClick }: TabProps): JSX.Element => {
  return (
    <a
      role="tab"
      onClick={onClick}
      className={clsx("tab transition all", {
        "tab-active": active,
      })}
    >
      {title}
    </a>
  );
};

export { Tab };
