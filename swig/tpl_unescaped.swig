<html>
	<head>
		<title>{{ title|raw }}</title>
	</head>
	<body>
		{% if projects.length %}
			{% for project in projects %}
				<a href="{{ project.url|raw }}">{{ project.name|raw }}</a>
				{{ project.description|raw }}
			{% endfor %}
		{% else %}
			No projects
		{% endif %}
	</body>
</html>