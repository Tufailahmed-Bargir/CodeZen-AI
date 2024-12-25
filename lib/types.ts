export type Repository = {
  id: string;
  name: string;
  private: boolean;
  language: string | null;
  size: number;
  updated_at: string;
  html_url: string;
};

export type ButtonProps = {
  ImageSrc: string;
  text: string;
  onClick?: () => void;
  bgColor?: string;
  textColor?: string;
};

export type TabProps = {
  id: string;
  name: string;
  private: boolean;
  language: string | null;
  size: number;
  updated_at: string;
  html_url: string;
};

export type InfoItemProps = {
  text: string;
  // @ts-expect-error: ignore this type
  icon: JSX.Element;
};
