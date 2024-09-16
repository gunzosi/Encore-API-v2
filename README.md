# Encore-API
ENCORE API - https://encore.dev/

# Project Setup Instructions

## 1. Download the Project Folder
- Clone the repository or download the project folder from the given source.

## 2. Open the Project Folder
- Navigate to the folder where the project files are located after downloading.

## 3. Navigate to the Folder Using Command Line
- Use the terminal or command prompt to change the directory to the project folder:
    ```bash
    cd <project-folder>
    ```

## 4. Start Docker
- Ensure Docker is installed and running on your system.

## 5. Run the Encore Application
- Start the Encore application by running the following command:
    ```bash
    encore run
    ```

## 6. Test PostgreSQL Cloud Connection
- Test the connection to the PostgreSQL cloud database using the following command:
    ```bash
    encore db conn-uri <database-name>
    ```
- Replace `<database-name>` with **student**, like this:
    ```bash
    encore db conn-uri student
    ```

