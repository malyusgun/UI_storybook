export interface ITreeItem {
  label: string;
  link?: string;
  color?: string;
  iconBefore?: string;
  iconAfter?: string;
  iconColor?: string;
  children?: ITreeItem[];
}
