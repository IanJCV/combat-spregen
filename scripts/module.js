var latestTurn = -1;

Hooks.on('combatTurn', (combat, data, options) => {
    if (latestTurn >= data.turn || options.direction < 0 || data.round <= 1) return;

    const update = {};
    let combatant = game.combat.nextCombatant;
    let token = canvas.tokens.get(combatant.tokenId);
    let document = token.document;
    if (token.document.actorLink)
    {
        let actor = Actor.get(game.combat.nextCombatant.actorId);
        let props = actor.system.props;
        
        update['system.props.spcurrent'] = Math.min(parseInt(props.spcurrent) + parseInt(props.spregen), parseInt(props.spmax));
        actor.update(update);
    }
    else
    {
        // let props = document.actorData.system.props;
        // update['actorData.system.props.spcurrent'] = Math.min(parseInt(props.spcurrent) + parseInt(document._actor.system.props.spregen), parseInt(document._actor.system.props.spmax));
        // document.update(update);
    }

    latestTurn = data.turn;
});

Hooks.on('combatRound', (combat, data, options) => {
    if (options.direction < 0) return;
    latestTurn = 0;

    const update = {};
    let combatant = game.combat.nextCombatant;
    let token = canvas.tokens.get(combatant.tokenId);
    let document = token.document;
    if (token.document.actorLink)
    {
        let actor = Actor.get(game.combat.nextCombatant.actorId);
        let props = actor.system.props;
        
        update['system.props.spcurrent'] = Math.min(parseInt(props.spcurrent) + parseInt(props.spregen), parseInt(props.spmax));
        actor.update(update);
    }
    else
    {
        // let props = document.actorData.system.props;
        // update['actorData.system.props.spcurrent'] = Math.min(parseInt(props.spcurrent) + parseInt(document._actor.system.props.spregen), parseInt(document._actor.system.props.spmax));
        // document.update(update);
    }
});