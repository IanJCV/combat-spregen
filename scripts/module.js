var latestTurn = -1;

Hooks.on('combatTurn', (combat, data, options) => {
    if (latestTurn >= data.turn || options.direction < 0) return;

    let actor = Actor.get(game.combat.combatants._source[data.turn].actorId);
    let props = actor.system.props;
    
    const update = {};
    update['system.props.spcurrent'] = Math.min(parseInt(props.spcurrent) + parseInt(props.spregen), parseInt(props.spmax));
    actor.update(update);
    latestTurn = data.turn;
});

Hooks.on('combatRound', (combat, data, options) => {
    if (options.direction < 0) return;
    latestTurn = 0;

    let actor = Actor.get(game.combat.combatants._source[data.turn].actorId);
    let props = actor.system.props;
    
    const update = {};
    update['system.props.spcurrent'] = Math.min(parseInt(props.spcurrent) + parseInt(props.spregen), parseInt(props.spmax));
    actor.update(update);
});