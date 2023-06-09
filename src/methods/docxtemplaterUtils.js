
export async function generateDoc() {
    const PizZip = require('pizzip');
    const Docxtemplater = require('docxtemplater');
    const fs = require('fs');
    const path = require('path');
    // 讀取模板文件的二進制內容
    const content = fs.readFileSync(path.resolve(__dirname, './docxtemplate/EX候選.docx'), 'binary');
    
    const zip = new PizZip(content);
    
    const doc = new Docxtemplater(zip, {
        paragraphLoop: true,
        linebreaks: true,
    });
    
    // 渲染文檔（將 {first_name} 替換為 John，{last_name} 替換為 Doe，...）
    doc.render({
        first_name: 'John',
        last_name: 'Doe',
        phone: '0652455478',
        description: 'New Website',
    });
    
    const buf = doc.getZip().generate({
        type: 'nodebuffer',
        // 壓縮選項：DEFLATE 添加壓縮步驟。
        // 對於一個 50MB 的輸出文檔，預計額外需要 500ms 的 CPU 時間
        compression: 'DEFLATE',
    });
    
    // 將 buf 寫入到檔案中
    fs.writeFileSync(path.resolve(__dirname, 'output.docx'), buf);

    return buf;
}
