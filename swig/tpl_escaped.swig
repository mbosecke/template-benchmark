<html>
	<head>
		<title>{{ title }}</title>
	</head>
	<body>
		{% if projects.length %}
			{% for project in projects %}
				<a href="{{ project.url }}">{{ project.name }}</a>
				{{ project.description }}
			{% endfor %}
		{% else %}
			No projects
		{% endif %}
	</body>
</html>