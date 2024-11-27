import { SvgIconProps } from "@mui/material/SvgIcon";

export interface BreadcrumbOption {
    label: string;
    icon?: React.ReactElement<SvgIconProps>;
    path?: string;
}

export interface CustomBreadcrumbsProps {
    options: BreadcrumbOption[];
}
