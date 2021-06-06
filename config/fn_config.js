exports.getNovosAmigos = (euAmigos, usuarios) => {
  const result = []

  for (let i = 0; i < usuarios.length; i++) {
    for (let j = 0; j < euAmigos.length; j++) {
      if (usuarios[i]._id.toString() == euAmigos[j]._id.toString()) break;
      if (euAmigos.length == (j + 1)) result.push(usuarios[i]);
    }
  }
  return result.map(u => {
    u.amigos = undefined
    u.conversas = undefined
    u.notificacoes = undefined
    u.senha = undefined
    return u
  });
}
