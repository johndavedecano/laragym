<?php

namespace App\Policies;

use App\User;
use App\Subscription;
use App\Policies\HasAdmin;
use Illuminate\Auth\Access\HandlesAuthorization;

class SubscriptionPolicy
{
    use HandlesAuthorization;
    use HasAdmin;

    /**
     * Determine whether the user can view the subscription.
     *
     * @param  \App\User  $user
     * @param  \App\Subscription  $subscription
     * @return mixed
     */
    public function view(User $user, Subscription $subscription)
    {
        return $user->is_admin || $user->id === $subscription->user_id;
    }

    /**
     * Determine whether the user can create subscriptions.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        return $user->is_admin;
    }

    /**
     * Determine whether the user can update the subscription.
     *
     * @param  \App\User  $user
     * @param  \App\Subscription  $subscription
     * @return mixed
     */
    public function update(User $user, Subscription $subscription)
    {
        return $user->is_admin;
    }

    /**
     * Determine whether the user can delete the subscription.
     *
     * @param  \App\User  $user
     * @param  \App\Subscription  $subscription
     * @return mixed
     */
    public function delete(User $user, Subscription $subscription)
    {
        return $user->is_admin;
    }
}
