<html>
	<head>
		<title>{{ title|raw }}</title>
	</head>
	<body>
		<p>{{ text|raw }}</p>
		{% if projects.length %}
			{% for project in projects %}
				<a href="{{ project.url|raw }}">{{ project.name|raw }}</a>
				<p>{{ project.description|raw }}</p>
			{% endfor %}
		{% else %}
			No projects
		{% endif %}
	</body>
</html>