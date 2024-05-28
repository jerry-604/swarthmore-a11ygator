# How to Edit the Next.js Website

## Step 1: Download the Current A11y Files

1. Clone the repository containing the current A11y files:
    ```sh
    git clone https://github.com/jerry-604/a11y_files.git
    ```

## Step 2: Add Files to the Custom Swarthmore Server or Any Storage Bucket

1. Upload the files from the cloned repository to the custom Swarthmore server or any preferred storage bucket.

## Step 3: Edit the Website

1. Clone the Next.js website repository:
    ```sh
    git clone https://github.com/Swarthmore/a11y-doc-repo.git
    ```
2. Navigate to the project directory:
    ```sh
    cd a11y-doc-repo
    ```

## Step 4: Update the Storage URL

1. Open the file `/a11ygator-next/src/components/HTMLViewer.tsx` and update the `storageUrl` on line 20 with the new link to the storage bucket.

2. Open the file `/a11ygator-next/src/pages/_app.tsx` and update the `storageUrl` on line 122 with the new link to the storage bucket.

## Step 5: Push Changes to Production

1. Stage and commit your changes:
    ```sh
    git add .
    git commit -m "Updated storageUrl with new link to the storage bucket"
    ```

2. Push the changes to the production branch:
    ```sh
    git push origin main
    ```


