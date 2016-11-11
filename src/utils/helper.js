export default {
  formatTemplate(content, data) {
    return content.replace(/\{\{(\w+)\}\}/g, (s, s1) => {
      return data[s1] || '';
    });
  }
};
