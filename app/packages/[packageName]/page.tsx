export default function PackagePage( {params}: {
	params: { packageName: string }
} ) {
	return(
		<div>
			<h1>This is the page for the {params.packageName} package.</h1>
		</div>
	);
}