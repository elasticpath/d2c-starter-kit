import { withNavServerSideProps } from "../lib/nav-wrapper-ssr";
import Blurb from "../components/shared/blurb";

const About = () => <Blurb />;

export default About;

export const getServerSideProps = withNavServerSideProps();
