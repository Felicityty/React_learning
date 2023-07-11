import yayJpg from '../assets/yay.jpg';
import { Button, message } from 'antd';
import copy from 'copy-to-clipboard';

export default function HomePage() {
  const handleClick = () => {
    // copyToClipboard('11111')
    copy('2222')
    message.success('ok')
  }

  function copyToClipboard(content: any) {
    const aux = document.createElement('input')
    aux.setAttribute('value', content)
    document.body.appendChild(aux)
    aux.select()
    document.execCommand('copy')
    document.body.removeChild(aux)
  }

  return (
    <div>
      <h2>Yay! Welcome to umi!</h2>
      <p>
        <img src={yayJpg} width="388" />
      </p>
      <p>
        To get started, edit <code>pages/index.tsx</code> and save to reload.
      </p>
      <Button onClick={handleClick}>点击</Button>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
      <div>......</div>
    </div>
  );
}
