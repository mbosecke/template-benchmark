<html>
	<head>
		<title>{{ title }}</title>
	</head>
	<body>
		<p>{{ text }}</p>
		{% if projects.length %}
			{% for project in projects %}
				<a href="{{ project.url }}">{{ project.name }}</a>
				<p>{{ project.description }}</p>
			{% endfor %}
		{% else %}
			No projects
		{% endif %}
	</body>
</html>