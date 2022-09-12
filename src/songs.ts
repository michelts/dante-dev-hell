let isPlaying = false;

export function hit(): void {
  if (!isPlaying) {
    isPlaying = true;
    playHit();
    setTimeout(() => {
      isPlaying = false;
    }, [500]);
  }
}

export function playHit(): void {
  const audioCtx = new window.AudioContext();
  const gainNode = audioCtx.createGain();
  gainNode.connect(audioCtx.destination);
  gainNode.gain.value = 1;

  [22, 25, 22].forEach((value, index) => {
    const oscillator = audioCtx.createOscillator();
    oscillator.type = "sawtooth";
    oscillator.start(index * 0.1);
    oscillator.frequency.setValueAtTime(
      440 * 1.06 ** (13 - value),
      0.1 * index
    );
    gainNode.gain.setValueAtTime(1, index * 0.1);
    gainNode.gain.setTargetAtTime(0.0001, index * 0.1 + 0.08, 0.005);
    oscillator.stop(index * 0.1 + 0.09);
    oscillator.connect(gainNode);
  });
}
