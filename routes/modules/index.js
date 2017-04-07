/**** Attachments ****/
export const removeAttachment = (name, attachments) => {
    const copy = attachments.slice(),
        idx = attachments.findIndex((v) => v.file.name === name);

    copy.splice(idx, 1);
    return copy;
};

// ignores files with same names
// each file in files must be {file, dataUrl} obj
export const addAttachments = (files, attachments) => {
    const res = files.filter((f) => {
        return !attachments.find((v) => v.file.name === f.file.name);
    });

    return res.length > 0 ? attachments.concat(res) : attachments;
};

export const finalizeAttachmentLoad = (fileName, dataUrl, attachments) => {
    const idx = attachments.findIndex((v) => v.file.name === fileName);

    if(idx < 0) {
        return attachments;
    }

    const attach = {...attachments[idx], ... { dataUrl } };
    //Object.assign({}, attachments[idx], {dataUrl});
    const res = attachments.slice(0, idx)
        .concat([attach])
        .concat(attachments.slice(idx + 1));

    return res;
};

/**** Attachments ****/
