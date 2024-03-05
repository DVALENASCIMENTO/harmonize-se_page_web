document.addEventListener("DOMContentLoaded", function() {
  // Botão para expandir/recolher o sidebar
  var toggleSidebarButton = document.getElementById('toggleSidebar');
  var sidebar = document.getElementById('sidebar');

  toggleSidebarButton.addEventListener('click', function() {
    sidebar.classList.toggle('active');
  });

  // Recolher o sidebar ao clicar em qualquer parte da tela
  document.body.addEventListener('click', function(event) {
    if (!sidebar.contains(event.target) && !toggleSidebarButton.contains(event.target)) {
      sidebar.classList.remove('active');
    }
  });

  var speechUtterance = null;
  var paused = false; // Variável para controlar o estado de pausa
  var playPauseSpeechButton = document.getElementById('playPauseSpeech');

  // Função para iniciar a leitura
  function iniciarLeitorDeVoz() {
    var elementosDeTexto = document.querySelectorAll('.main h2, .main p, .main ol, .main li');
    var texto = '';

    elementosDeTexto.forEach(function(elemento) {
      texto += elemento.innerText + ' ';
    });

    if (speechUtterance && paused) {
      // Se a leitura foi pausada, retomar a partir do ponto de pausa
      speechSynthesis.resume();
      paused = false; // Reiniciar o estado de pausa
      playPauseSpeechButton.textContent = "❚❚";
    } else {
      if (speechUtterance) {
        // Se já houver uma leitura em andamento, pare antes de iniciar uma nova
        speechSynthesis.cancel();
      }

      speechUtterance = new SpeechSynthesisUtterance(texto);
      speechUtterance.rate = 1.0; // Definir a velocidade para 1.0
      speechSynthesis.speak(speechUtterance);
      playPauseSpeechButton.textContent = "❚❚";
    }
  }

  // Função para pausar ou retomar a leitura
  function togglePausarLeitorDeVoz() {
    if (speechUtterance) {
      if (paused) {
        speechSynthesis.resume(); // Retomar a leitura se estiver pausada
        paused = false;
        playPauseSpeechButton.textContent = "❚❚";
      } else {
        speechSynthesis.pause(); // Pausar a leitura se estiver em andamento
        paused = true;
        playPauseSpeechButton.textContent = "▶";
      }
    }
  }

  // Adiciona evento de clique ao botão de leitor de voz
  playPauseSpeechButton.addEventListener('click', function() {
    if (speechUtterance && !paused) {
      togglePausarLeitorDeVoz(); // Se a leitura está em andamento, pausar
    } else {
      iniciarLeitorDeVoz(); // Caso contrário, iniciar a leitura
    }
  });

  // Parar áudio quando a página está prestes a ser descarregada
  window.addEventListener('beforeunload', function() {
    if (speechUtterance) {
      speechSynthesis.cancel(); // Cancelar a leitura
    }
  });

  // Inicia o áudio quando a página é carregada
  var audio = document.getElementById('audio');
  var playPauseAudioButton = document.getElementById('playPauseAudio');

  playPauseAudioButton.addEventListener('click', function() {
    togglePlayPauseAudio();
  });

  // Função para iniciar/pausar a reprodução do áudio
  function togglePlayPauseAudio() {
    if (audio.paused) {
      audio.play();
      playPauseAudioButton.textContent = "❚❚"; // Altera o ícone para pausa
    } else {
      audio.pause();
      playPauseAudioButton.textContent = "▶"; // Altera o ícone para play
    }
  }

  // Função para aumentar/diminuir o tamanho da fonte
  function changeFontSize(size) {
    var currentFontSize = parseFloat(window.getComputedStyle(document.body, null).getPropertyValue('font-size'));
    document.body.style.fontSize = size === 'larger' ? (currentFontSize * 1.1) + 'px' : (currentFontSize / 1.1) + 'px';
  }

  // Seleciona os elementos de controle de fonte
  var increaseFontButton = document.getElementById('increaseFont');
  var decreaseFontButton = document.getElementById('decreaseFont');

  // Adiciona evento de clique ao botão de aumentar fonte
  increaseFontButton.addEventListener('click', function() {
    changeFontSize('larger');
  });

  // Adiciona evento de clique ao botão de diminuir fonte
  decreaseFontButton.addEventListener('click', function() {
    changeFontSize('smaller');
  });

});
