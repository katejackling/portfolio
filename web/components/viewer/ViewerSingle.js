import Media from "../../components/Media";

function ViewerSingle(props) {
  const { media = "", layout = "" } = props;
  const asset = media.condition ? media.video.asset : media.image.asset,
    type = media.condition ? "video" : "image",
    fit = layout;
  return (
    <figure className={fit}>
      <Media asset={asset} type={type} />
      <style jsx>{`
        :global(figure.contain img, figure.contain video) {
          object-fit: contain;
        }
        :global(figure.cover img, figure.cover video) {
          object-fit: cover;
        }
        @media screen and (min-width: 640px) {
        }
      `}</style>
    </figure>
  );
}

export default ViewerSingle;
