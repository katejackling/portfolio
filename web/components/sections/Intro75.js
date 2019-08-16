import Media from "../../components/Media";

function Intro75(props) {
  const { media = "", reference = "", layout = "" } = props;
  const asset = media.condition ? media.video.asset : media.image.asset,
    type = media.condition ? "video" : "image";

  return (
    <section className="intro__section intro__section--75">
      <figure>
        <Media asset={asset} type={type} />
        <figcaption>{reference && reference.title}</figcaption>
      </figure>
      <style jsx global>{`
        @media screen and (min-width: 640px) {
          .intro__section.intro__section--75 {
            display: flex;
            padding: 0 calc(var(--marginOuter) / 2);
          }

          .intro__section.intro__section--75 figure {
            width: 75%;
            padding: 0 calc(var(--marginOuter) / 2 + 1rem + 1rem) 0 calc(var(--marginOuter) / 2);
            background: red;
          }
        }
      `}</style>
      <style jsx>{`
        @media screen and (min-width: 640px) {
          .intro__section--75 {
            justify-content: ${layout === "left" ? "flex-start" : "flex-end"};
          }
        }
      `}</style>
    </section>
  );
}
export default Intro75;
