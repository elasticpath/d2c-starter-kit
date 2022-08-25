import { withNavStaticProps } from "../lib/nav-wrapper-ssg";
import Blurb from "../components/shared/blurb";

const FAQ = () => <Blurb title="FAQs" />;

export default FAQ;

export const getServerSideProps = withNavStaticProps();
