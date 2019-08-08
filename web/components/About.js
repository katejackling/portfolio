import Block from "../components/Block";

function About(props) {
  const { content } = props;
  console.log(content);
  return (
    <>
      <Block blocks={content.about} />
      <Block blocks={content.clients} />
      <Block blocks={content.editorial} />
    </>
  );
}

// About.propTypes = {
//   blocks: PropTypes.arrayOf(PropTypes.object)
// }

export default About;
