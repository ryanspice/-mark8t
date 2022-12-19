<style>
#admin-portal {
opacity:0;
position: absolute;
z-index: 11;
top: 1rem;
right: 1.5rem;
transition: opacity 0.2s ease-in-out;
}
#admin-portal:hover {
opacity: 1;
transition: opacity 0.2s ease-in-out;
cursor: pointer;
}
button {
	width:48px;
	height:48px;
	background-color: transparent;
	color: #fff;
	border: 0;
	border-radius: 0.25rem;
	text-align: center;
	text-decoration: none;
	display: inline-block;
	transition: background-color 0.2s ease-in-out;
}
object {
	pointer-events: none;
}
</style>
<a href="/admin">
	<button id="admin-portal">
		<object title="admin" data="/gear.svg" type="image/svg+xml"> </object>
	</button>
</a>