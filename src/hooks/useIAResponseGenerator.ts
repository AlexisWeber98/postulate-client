import { useState, useRef } from 'react';

export const useIAResponseGenerator = () => {
  const [paso, setPaso] = useState(0);
  const [enlace, setEnlace] = useState('');
  const [imagen, setImagen] = useState<File | null>(null);
  const [inputTab, setInputTab] = useState<'enlace' | 'imagen'>('enlace');
  const [tipoRespuesta, setTipoRespuesta] = useState('carta');
  const [tono, setTono] = useState('profesional');
  const [respuesta, setRespuesta] = useState('');
  const [loading, setLoading] = useState(false);
  const [analizando, setAnalizando] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const inputFileRef = useRef<HTMLInputElement>(null);

  // Drag & drop handlers
  const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setImagen(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImagen(e.target.files[0]);
    }
  };

  return {
    paso,
    setPaso,
    enlace,
    setEnlace,
    imagen,
    setImagen,
    inputTab,
    setInputTab,
    tipoRespuesta,
    setTipoRespuesta,
    tono,
    setTono,
    respuesta,
    setRespuesta,
    loading,
    setLoading,
    analizando,
    setAnalizando,
    dragActive,
    setDragActive,
    inputFileRef,
    handleDrag,
    handleDrop,
    handleFileChange,
  };
};
