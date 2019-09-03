import Block from "../components/Block";

function About(props) {
	const { content } = props;

	return (
		<article id="info" className="info">
			<section className="about">
				<Block blocks={content.about} />
			</section>
			<section className="clients">
				<h3>Clients</h3>
				<Block blocks={content.clients} />
			</section>
			<section className="editorial">
				<h3>Editorial</h3>
				<Block blocks={content.editorial} />
			</section>
			<section className="legal">
				<h3>Legal Notice</h3>
				<Block blocks={content.legal} />
			</section>
			<style jsx global>{`
				.info {
					display: flex;
					flex-wrap: wrap;
					padding: calc(var(--marginOuter) / 2);
					margin-bottom: var(--marginMedium);
				}

				.info h3 {
					text-transform: uppercase;
				}

				.info > * {
					padding: calc(var(--marginOuter) / 2);
					margin-bottom: var(--marginMedium);
				}

				.about {
					width: 100%;
				}

				.editorial,
				.clients {
					width: 50%;
				}
			`}</style>
		</article>
	);
}

export default About;
