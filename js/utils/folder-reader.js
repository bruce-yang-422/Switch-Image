/**
 * Recursive Drag-and-Drop Folder & File Reader
 * Supports dragging nested folders via DataTransferItem.webkitGetAsEntry().
 */
(function (root) {
  const SI = (root.SwitchImage = root.SwitchImage || {});

  function readEntriesBatch(dirReader) {
    return new Promise((resolve, reject) => {
      dirReader.readEntries(resolve, reject);
    });
  }

  async function traverseEntry(entry, outFiles) {
    if (!entry) return;
    if (entry.isFile) {
      await new Promise(resolve => {
        entry.file(
          file => {
            if (file) outFiles.push(file);
            resolve();
          },
          () => resolve()
        );
      });
      return;
    }

    if (entry.isDirectory) {
      const reader = entry.createReader();
      try {
        while (true) {
          const batch = await readEntriesBatch(reader);
          if (!batch || batch.length === 0) break;
          for (const child of batch) {
            await traverseEntry(child, outFiles);
          }
        }
      } catch {
        // Ignore unreadable subdirectory entries
      }
    }
  }

  async function extractFilesFromDataTransfer(dataTransfer) {
    if (!dataTransfer) return [];

    const items = dataTransfer.items;
    if (items && items.length && typeof items[0].webkitGetAsEntry === 'function') {
      const entries = [];
      for (let i = 0; i < items.length; i++) {
        if (items[i].kind === 'file') {
          const entry = items[i].webkitGetAsEntry();
          if (entry) entries.push(entry);
        }
      }
      if (entries.length) {
        const collected = [];
        for (const entry of entries) {
          await traverseEntry(entry, collected);
        }
        return collected;
      }
    }

    return Array.from(dataTransfer.files || []);
  }

  SI.folderReader = { extractFilesFromDataTransfer };
})(window);
