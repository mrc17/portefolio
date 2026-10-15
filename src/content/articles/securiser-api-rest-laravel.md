---
title: "Sécuriser une API REST avec Laravel : les bases qui comptent vraiment"
excerpt: "Authentification, validation, autorisation, limitation de débit : les mesures concrètes que j'applique systématiquement pour sécuriser une API Laravel, en suivant l'OWASP Top 10."
publishedAt: 2026-10-12
---

Une API exposée sur Internet est une porte d'entrée. Dans mes projets — billetterie, e-commerce, plateformes métier — la sécurité de l'API n'est pas une option ajoutée à la fin, c'est une contrainte présente dès la conception. Voici les mesures que j'applique systématiquement sur une API Laravel, organisées autour des risques du **OWASP Top 10**.

## 1. Authentifier correctement

Pour une API consommée par une application mobile ou un front JavaScript, j'utilise **Laravel Sanctum** (jetons personnels) ou un flux OAuth selon le besoin. La règle : aucun endpoint sensible accessible sans jeton valide, et des jetons à portée limitée plutôt qu'un jeton tout-puissant.

Les jetons ont une durée de vie, sont révocables, et ne transitent jamais dans une URL.

## 2. Valider toutes les entrées

Chaque requête qui écrit des données passe par une **Form Request** dédiée. On ne fait jamais confiance au client :

```php
public function rules(): array
{
    return [
        'email' => ['required', 'email', 'max:255'],
        'montant' => ['required', 'integer', 'min:100'],
    ];
}
```

La validation protège à la fois contre les données corrompues et contre une partie des injections.

## 3. Se protéger du mass assignment

Une faille classique : laisser un client injecter un champ qu'il ne devrait pas pouvoir modifier (par exemple `role` ou `is_admin`). Je déclare explicitement les champs autorisés avec `$fillable`, et je n'utilise jamais `$guarded = []` sur un modèle sensible.

## 4. Autoriser, pas seulement authentifier

Être connecté ne veut pas dire avoir le droit. Chaque action vérifie que l'utilisateur a bien la permission sur **cette** ressource précise, via les **Policies** de Laravel :

```php
$this->authorize('update', $commande);
```

C'est la protection contre les accès horizontaux (lire la commande d'un autre utilisateur en changeant un identifiant dans l'URL).

## 5. Limiter le débit

Le `throttle` de Laravel protège les endpoints sensibles (connexion, paiement, contact) contre le brute force et les abus :

```php
Route::middleware('throttle:10,1')->post('/login', ...);
```

## 6. Les fondamentaux qu'on oublie

- **HTTPS partout**, sans exception.
- **Secrets hors du code** : clés d'API dans `.env`, jamais commitées.
- **CORS** configuré pour n'autoriser que les origines légitimes.
- **Messages d'erreur sobres** : ne jamais exposer la stack trace ou la structure de la base en production.
- **Dépendances à jour** : un `composer audit` régulier évite de traîner des failles connues.

## En résumé

La sécurité d'une API Laravel ne tient pas à un outil magique, mais à une discipline : authentifier, valider, autoriser, limiter, et ne jamais faire confiance au client. Ces réflexes, appliqués dès le départ, coûtent peu et évitent l'essentiel des incidents.

Besoin d'un audit de votre API ? [Parlons-en](/contact/).
