import * as React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import * as mui from "material-ui";

const StyledLink = styled(Link) `
    text-decoration: none;
`;
interface IProps {
    onClick?: () => void; // can be optional
    to: string;
    title: string;
}

export default function (props: IProps) {
    return (
        <StyledLink to={props.to}>
            <mui.MenuItem onClick={props.onClick}>{props.title}</mui.MenuItem>
        </StyledLink>
    );
}