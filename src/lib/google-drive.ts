// Google Drive API Integration
// Requires "identity" permission in manifest and the "oauth2" key configured with a Google Cloud Client ID.

export const authenticateGoogleDrive = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    chrome.identity.getAuthToken({ interactive: true }, (token) => {
      if (chrome.runtime.lastError) {
        reject(new Error(chrome.runtime.lastError.message));
        return;
      }
      const tokenString = typeof token === 'object' && token?.token ? (token as any).token : token;
      if (!tokenString) {
        reject(new Error("Failed to retrieve Google Auth token."));
        return;
      }
      resolve(tokenString as string);
    });
  });
};

export const uploadVideoToDrive = async (
  token: string,
  videoBlob: Blob,
  filename: string,
  onProgress?: (progress: number) => void
): Promise<any> => {
  const metadata = {
    name: filename,
    mimeType: videoBlob.type || 'video/mp4',
  };

  // Step 1: Initiate a resumable upload session
  const initResponse = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
      'X-Upload-Content-Type': metadata.mimeType,
      'X-Upload-Content-Length': videoBlob.size.toString(),
    },
    body: JSON.stringify(metadata),
  });

  if (!initResponse.ok) {
    const errorText = await initResponse.text();
    throw new Error(`Drive Resumable Session init failed: ${initResponse.status} ${errorText}`);
  }

  const uploadUrl = initResponse.headers.get('Location');
  if (!uploadUrl) {
    throw new Error('Drive API did not return a Location header for resumable upload.');
  }

  // Step 2: Upload the actual file data via XMLHttpRequest to support progress tracking
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('PUT', uploadUrl, true);

    if (onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100;
          onProgress(Math.round(percentComplete));
        }
      };
    }

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const responseJson = JSON.parse(xhr.responseText);
          resolve(responseJson);
        } catch (e) {
          resolve(xhr.responseText);
        }
      } else {
        reject(new Error(`Drive Upload failed: ${xhr.status} ${xhr.responseText}`));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Drive Upload encountered a network error.'));
    };

    // No Authorization header needed here, the upload URL contains an upload_id
    xhr.setRequestHeader('Content-Type', metadata.mimeType);
    xhr.send(videoBlob);
  });
};
