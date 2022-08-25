import { withNavStaticProps } from "../lib/nav-wrapper-ssg";
import Blurb from "../components/shared/blurb";

const Terms = () => <Blurb title="Terms & Conditions" />;

export default Terms;

export const getServerSideProps = withNavStaticProps();
