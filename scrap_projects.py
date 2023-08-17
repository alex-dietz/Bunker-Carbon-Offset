import requests

# Base URL for the API
BASE_URL = "https://api.carbonmark.com/api/projects"


def get_all_projects():
    """Fetch all projects from the API."""
    response = requests.get(BASE_URL)
    if response.status_code == 200:
        print(response.json())
        return response.json()
    else:
        print(f"Failed to fetch projects with status code {response.status_code}.")
        return []


def get_project_details(project_key, project_vintage):
    """Fetch details of a particular project."""
    url = f"{BASE_URL}/{project_key}-{project_vintage}"
    response = requests.get(url)
    if response.status_code == 200:
        print(response.json())
        return response.json()
    else:
        print(f"Failed to fetch project details with status code {response.status_code}.")
        return None


def main():
    total_tokens = 0
    projects = get_all_projects()

    for project in projects:
        details = get_project_details(project["key"], project["vintage"])
        if details and "stats" in details and "totalSupply" in details["stats"]:
            total_tokens += details["stats"]["totalSupply"]

    print(f"Total available tokens: {total_tokens}")


if __name__ == "__main__":
    main()
