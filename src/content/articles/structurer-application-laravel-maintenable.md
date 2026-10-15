---
title: "Structurer une application Laravel pour qu'elle dure"
excerpt: "Contrôleurs fins, Form Requests, classes d'action et tests : comment garder une application Laravel claire et maintenable à mesure qu'elle grandit."
publishedAt: 2026-10-14
---

Au début, une application Laravel est simple. Le problème arrive six mois plus tard, quand la logique métier s'est accumulée dans les contrôleurs et les modèles, et que chaque modification devient risquée. Voici les principes que j'applique pour qu'une application reste claire en grandissant.

## Des contrôleurs qui ne font que coordonner

Un contrôleur devrait lire une requête, déléguer le travail, et renvoyer une réponse. Rien de plus. S'il contient de la logique métier, des calculs ou des appels à des services externes, c'est un signal qu'il faut extraire.

```php
public function store(CreerCommandeRequest $request, CreerCommande $action)
{
    $commande = $action->execute($request->validated());

    return redirect()->route('commandes.show', $commande);
}
```

## La validation dans des Form Requests

Sortir les règles de validation du contrôleur le rend lisible et rend les règles réutilisables et testables. Chaque action d'écriture a sa Form Request.

## La logique métier dans des classes d'action

Plutôt que des modèles obèses ou des services fourre-tout, j'aime les **classes d'action** : une classe = une intention métier (`CreerCommande`, `ValiderPaiement`, `GenererBulletin`). C'est facile à lire, à tester isolément et à réutiliser depuis un contrôleur, une commande Artisan ou une file d'attente.

## Garder les modèles pour les données

Le modèle décrit la donnée et ses relations : attributs, casts, scopes, relations. Il ne pilote pas des processus métier complexes. Un modèle qui envoie des emails et appelle une API de paiement est un modèle qui en fait trop.

## Tester ce qui compte

On ne teste pas pour atteindre 100 % de couverture, mais pour sécuriser les parcours critiques : création de commande, paiement, calcul de montants, permissions. Les classes d'action, isolées, se testent facilement — et ces tests deviennent un filet de sécurité pour les évolutions futures.

## Ne pas abstraire trop tôt

Le piège inverse existe : ajouter des couches, des interfaces et des patterns « au cas où ». Trois lignes répétées valent mieux qu'une abstraction prématurée. J'extrais quand la répétition devient réelle, pas avant.

## En résumé

Une application Laravel maintenable repose sur une répartition claire : contrôleurs fins, validation dédiée, logique métier dans des actions, modèles centrés sur la donnée, et des tests sur les parcours critiques. Rien d'exotique — juste de la discipline, appliquée avec constance.

Un projet Laravel à concevoir ou à remettre d'aplomb ? [Contactez-moi](/contact/).
