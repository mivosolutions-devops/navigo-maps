import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import Cookies from "js-cookie";
import { NextRequest, NextResponse } from "next/server";
import { authService, usersService } from "@/services";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const trimText = (text: string) => `${text.slice(0, 24)}...`;

export const capitalizeLetter1 = (text: string) =>
  text.charAt(0).toUpperCase().concat(text.slice(1).toLowerCase());

export const checkPage = <T extends { page: string }>(
  page: string,
  pagesChildrenData: T[],
): T | undefined => {
  for (let i = 0; i < pagesChildrenData.length; i++) {
    if (page == pagesChildrenData[i].page) {
      return pagesChildrenData[i];
    }
  }
  return undefined;
};

export const formatStringTags = (tag: string) =>
  tag.toLowerCase().replace("-", " ");

const parseJwt = (token: string): Record<string, any> | null => {
  try {
    const base64Url = token.split(".")[1];

    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map((c) => `%${`00${c.charCodeAt(0).toString(16)}`.slice(-2)}`)
        .join(""),
    );

    return JSON.parse(jsonPayload);
  } catch (error) {
    console.error("Error parsing JWT:", error);
    return null;
  }
};

export const isTokenExpired = (
  currentUserCookie: string,
  type: "REFRESH" | "ACCESS",
  preferedExpTimeThreshold: number = 60,
): boolean => {
  try {
    const tokens = currentUserCookie
      ? (JSON.parse(currentUserCookie) || "{}").tokens
      : null;

    if (!tokens) {
      return true;
    }

    const token = type == "ACCESS" ? tokens?.accessToken : tokens?.refreshToken;

    if (!token) return true;

    const decodedToken = parseJwt(token);

    if (!decodedToken || !decodedToken.exp) return true;

    return Date.now() >= (decodedToken.exp - preferedExpTimeThreshold) * 1000;
  } catch (error) {
    console.error("Error parsing currentUser cookie:", error);
    return true;
  }
};

export const getAuthorizationHeader = ({
  isClient = true,
  tokens,
}: {
  isClient?: boolean;
  tokens?: TAuthTokens;
}) => {
  const currentUser = Cookies.get("currentUser");
  const authTokens = isClient ? JSON.parse(currentUser || "")?.tokens : tokens;

  return {
    Authorization: `Bearer ${authTokens.accessToken}`,
  };
};

export async function redirectWithError(
  request: NextRequest,
  errorMessage: string,
  redirectURI?: string,
) {
  console.log("error message ===>", errorMessage);
  const redirectUrl = redirectURI
    ? new URL(redirectURI)
    : new URL(
        `${process.env.NEXT_PUBLIC_AUTH_URL}?redirect_uri=${updateRedirectUrl(request.nextUrl.href)}`,
      );
  const response = NextResponse.redirect(redirectUrl);
  return response;
}

export const updateRedirectUrl = (redirectURI: string): string => {
  const newUrl = new URL(redirectURI);
  console.log(newUrl);
  return newUrl.toString();
};

export const checkAllowedToViewPortal = async (newTokens: TAuthTokens) => {
  try {
    const allowedToViewRes = await usersService.getMe({
      isClient: false,
      tokens: newTokens,
    });
    if (allowedToViewRes && allowedToViewRes.status == 200) {
      const user = allowedToViewRes.user as TUser;
      const permissions = extractUniquePermissions(user);
      const isAllowed = permissions.find(
        (permission) => permission.slug === "view.admin-portal",
      );
      return !!isAllowed;
    }
  } catch (error) {
    console.log("Unable to check permimissions", error);
    return false;
  }
};

export const setAuthorizationToken = (
  currentUser: {
    tokens: TAuthTokens;
    isAllowed: boolean;
  },
  options: { isClient: boolean },
) => {
  const { isClient } = options;

  if (isClient) {
    Cookies.set("currentUser", JSON.stringify(currentUser), {
      secure: process.env.NODE_ENV === "production",
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_DOMAIN_NAME
          : "",
      path: "/",
    });
  } else {
    const response = NextResponse.next();
    response.cookies.set("currentUser", JSON.stringify(currentUser), {
      secure: process.env.NODE_ENV === "production",
      domain:
        process.env.NODE_ENV === "production"
          ? process.env.NEXT_PUBLIC_DOMAIN_NAME
          : "",
      path: "/",
    });

    return response;
  }
};

export const isAllowed = (currentUser: {
  token: TAuthTokens;
  isAllowed: boolean;
}) => currentUser.isAllowed;

export function extractUniquePermissions(user: TUser): TPermission[] {
  const userPermissions = user.permissions;

  const rolePermissions = user.roles.flatMap((role) => role.permissions);

  const allPermissions = [...userPermissions, ...rolePermissions];

  const uniquePermissions = Array.from(
    new Set(allPermissions.map((permission) => permission.slug)),
  )
    .map((slug) => {
      return allPermissions.find((permission) => permission.slug === slug);
    })
    .filter((permission) => permission !== undefined) as TPermission[];

  return uniquePermissions;
}

export const mapStyles = [
  {
    featureType: "all",
    elementType: "labels.text.fill",
    stylers: [
      {
        saturation: 36,
      },
      {
        color: "#000000",
      },
      {
        lightness: 40,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.text.stroke",
    stylers: [
      {
        visibility: "on",
      },
      {
        color: "#000000",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "all",
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
      {
        weight: 1.2,
      },
    ],
  },
  {
    featureType: "landscape",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 20,
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 21,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry.stroke",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 29,
      },
      {
        weight: 0.2,
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 18,
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 16,
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 19,
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
      {
        lightness: 17,
      },
    ],
  },
];
