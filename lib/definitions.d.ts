type TLayoutProps = {
  children: ReactNode;
};

type TAnalyticCardProps = {
  icon: ReactNode;
  title: string;
  description: string;
  amount: number;
  size?: string;
  extra?: string;
  extraStyles?: string;
  textStyles?: string;
};

type TChartProps = {
  chartData: any[];
  chartOptions: any;
};

type TNotificationProps = {
  user: string;
  message: string;
  sentAt: string;
  status: string;
};

type TTextSizes =
  | "text-xs"
  | "text-sm"
  | "text-base"
  | "text-lg"
  | "text-xl"
  | "text-2xl"
  | "text-3xl"
  | "text-4xl"
  | "text-5xl"
  | "text-6xl"
  | "text-7xl";

type TeamMember = {
  name: string;
  id: string;
  role: string;
  imgUrl: string;
};

type Vehicle = {
  plateNumber: string;
  type: string;
  source: string;
  destination: string;
  currentLocation: string;
  id: string;
};

type MemberStatus =
  | "deactivated"
  | "active online"
  | "blocked"
  | "active offline";

type TeamMemberData = Omit<TeamMember, "role"> & {
  email: string;
  status: MemberStatus;
  phoneNumber: string;
  createdAt: string;
};

type VehicleInfo = TeamMemberData & {
  plateNumber: string;
};

type Member = {
  header: ReactNode;
  content: ReactNode;
  headerExtraStyle?: string;
  contentExtraStyle?: string;
  wrapperStyles?: string;
  handleClick?: MouseEventHandler<HTMLInputElement> | undefined;
};

type ActionModalProps = {
  trigger: ReactNode;
  title?: string;
  description?: string;
  actionContent: ReactNode;
  wrapperStyles?: string;
  open?: boolean;
  setOpen?: Dispatch<SetStateAction<boolean>>;
  container?: any;
};

type CustomFormFieldProps = {
  control: any;
  name: string;
  label?: string;
  placeholder: string;
  inputStyles?: string;
  formItemStyles?: string;
  type?: HTMLInputTypeAttribute;
  wrapperStyles?: string;
  variant?: "filled" | "outlined";
};

type UseLoadingProps = {
  loading: boolean;
  withLoading: <T>(asyncFunction: () => Promise<T>) => Promise<T>;
};

type TPermission = {
  active: boolean;
  description: string;
  id: string;
  slug: string;
};

type TRole = {
  active: boolean;
  id: string;
  name: string;
  permissions: TPermission[];
};

type TUser = {
  phoneNumber: string;
  email: string;
  firstName: string;
  lastName: string;
  roles: TRole[];
  profilePicture: string | undefined;
  permissions: TPermission[];
};

type TAuthTokens = {
  accessToken: string;
  refreshToken: string;
};

type TParams = {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: string;
  orderDirection?: "ASC" | "DESC";
};

type TRoute = {
  location: string;
  address: string;
  latitude: number;
  longitude: number;
  id: string;
};
