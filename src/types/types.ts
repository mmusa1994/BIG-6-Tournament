import { ReactNode } from 'react';

export interface IButton {
  disabled?: boolean | undefined;
  onClick: () => void;
  text: string;
  type?: 'submit' | 'reset' | 'button';
  size?: string;
  sizeH?: string;
  variant?: 'primary' | 'secondary' | 'text' | 'delete';
  position?: 'left' | 'center' | 'right';
  icon?: JSX.Element | ReactNode;
}

export interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  errorMessage?: string;
  firstAction?: JSX.Element | null;
  label?: string;
  secondAction?: JSX.Element | null;
  icon?: JSX.Element;
  searchIcon?: boolean;
  inputRef?: React.Ref<any>;
  containerClasses?: string;
  inputWrapperStyle?: string;
  width?: string;
}

export interface IModal {
  title: string;
  children: ReactNode | undefined;
  actions?: ReactNode | undefined;
  show: boolean;
  close: () => void;
  maxWidth?: string;
  minHeight?: string;
}

export interface ITable {
  columns: any;
  data: any;
  allMatchPlayed?: boolean;
}

export interface ITeam {
  id?: number;
  logo?: string;
  name?: string;
  numOfPoints?: number;
  played?: any;
  score?: number;
}

export interface IMatchArena {
  hostScore: any;
  guestScore: any;
  simulateResultHandler: () => void;
}

export interface IMatchSimulatorData {
  matchArena: any;
  updateMatchArena: (data: any) => void;
  matchSimulatorHandler: (score1: number, score2: number) => void;
  playedHistoryHandler: () => void;
  error: string | undefined;
  hostTeam: ITeam | null;
  guestTeam: ITeam | null;
  teamsInPlay: ITeam[];
  isArenaOpen: boolean;
  isResultSimulated: boolean;
}
