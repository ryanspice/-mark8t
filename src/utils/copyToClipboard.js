/* Get the text field */
/* Select the text field */
/* Copy the text inside the text field */
export default function copyToClipboard(value) {
  const input = document.createElement("textarea");
  document.body.appendChild(input);
  input.value = localStorage.getObject(value) || "";
  const copyText = input;
  copyText.select();
  copyText.setSelectionRange(0, 99999); /*For mobile devices*/
  document.execCommand("copy");
  copyText.remove();
}
