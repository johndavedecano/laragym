<?php

namespace App\Policies;

use App\User;
use App\Subscription;
use Illuminate\Auth\Access\HandlesAuthorization;

class SubscriptionPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view the subscription.
     *
     * @param  \App\User  $user
     * @param  \App\Subscription  $subscription
     * @return mixed
     */
    public function view(User $user, Subscription $subscription)
    {
        //
    }

    /**
     * Determine whether the user can create subscriptions.
     *
     * @param  \App\User  $user
     * @return mixed
     */
    public function create(User $user)
    {
        //
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
        //
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
        //
    }
}
