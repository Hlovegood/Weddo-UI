import React from "react";
import {
  splitTypographyProps,
  usePageTypography,
  type PageTypographyProps,
} from "./pageTypography";
import { LandingPageFrame, type LandingPageProps } from "./LandingPageFrame";
import { WEDDO_TYPOGRAPHY } from "./pageRecipes";

export type WeddoLandingPageProps = LandingPageProps &
  PageTypographyProps & {
    secondaryColor?: string;
  };

export function WeddoLandingPage(props: WeddoLandingPageProps) {
  const { secondaryColor, ...rest } = props;
  const [type, frame] = splitTypographyProps(rest);
  const baseCustomization = usePageTypography(WEDDO_TYPOGRAPHY, type);

  const customization = React.useMemo(() => {
    if (!secondaryColor) return baseCustomization;
    return {
      ...baseCustomization,
      css: `${baseCustomization.css}\n:root { --ember: ${secondaryColor}; }`,
    };
  }, [baseCustomization, secondaryColor]);

  return (
    <LandingPageFrame
      {...frame}
      customization={customization}
      title="Weddo — Where Forever Begins"
      sourceUrl="/landing-pages/weddo.html"
    />
  );
}

export default WeddoLandingPage;
