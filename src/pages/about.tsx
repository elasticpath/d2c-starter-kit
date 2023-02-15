import { withStoreStaticProps } from "../lib/store-wrapper-ssg";
import Blurb from "../components/shared/blurb-about";

const About = () => <Blurb title="About" />;

export default About;

export const getServerSideProps = withStoreStaticProps();
